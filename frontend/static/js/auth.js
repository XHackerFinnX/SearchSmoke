async function handleError(message, error = null) {
    console.error(message, error);
    window.location.href = "/error";
    throw error || new Error(message);
}

(async () => {
    try {
        let attempts = 0;
        const maxAttempts = 5;
        let response, data;

        while (attempts < maxAttempts) {
            const userId = Telegram.WebApp.initDataUnsafe?.user?.id;
            try {
                response = await fetch("/api/auth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Telegram-InitData": Telegram.WebApp.initData,
                    },
                    body: JSON.stringify({ user_id: userId }),
                });

                if (response.ok) {
                    data = await response.json();
                    console.log("Auth success:", data);
                    return;
                }

                attempts++;
                console.warn(
                    `Auth failed (attempt ${attempts}): ${response.status}`
                );

                if (attempts < maxAttempts) {
                    await new Promise((r) => setTimeout(r, 1000)); // задержка 1 сек
                }
            } catch (fetchError) {
                attempts++;
                console.warn(`Ошибка при попытке ${attempts}:`, fetchError);

                if (attempts < maxAttempts) {
                    await new Promise((r) => setTimeout(r, 1000));
                }
            }
        }

        // Если все 5 попыток неудачны
        return handleError(`Auth failed after ${maxAttempts} attempts`);
    } catch (err) {
        await handleError("Ошибка при авторизации", err);
    }
})();
