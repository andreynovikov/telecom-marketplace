export async function saveContractor(formData) {
    const values = Object.fromEntries(formData.entries())
    console.log(values)

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/user/contractors`, {
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
            return {
                error: result.msg
            }
        }
    } catch (error) {
        console.error("Error: " + error)
        return {
            error
        }
    }
}
