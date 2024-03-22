'use server'

export async function login(prevState, formData) {
    const values = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${process.env.API_ROOT}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            credentials: "include"
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            return result
        } else {
            console.error(result.msg)
        }
    } catch (error) {
        console.error("Error: " + error);
    }
}
