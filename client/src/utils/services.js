// here we will be performing the http request

export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });
    //  in our server we have set some custom messges that messages we are setting here in the front end
    // those custome message which we wrote in the backend are like
    // invalid password
    // uname and passwors are already regestered
    // invalid password
    // all fileds are required
    const data = await response.json();
    if (!response.ok) {
        let message;
        // the below one is we are performing check logic.
        if (data?.message) {
            message = data.message
        } else {
            message = data;
        }
        return { error: true, message };

    }

    return data;
};

export const getRequest = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
        let message = "an error occured..."

        if (data?.message) {
            message = data.message
        }
        return { error: true, message }
    }

    return data;


}

