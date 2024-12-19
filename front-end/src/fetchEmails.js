const fetchEmails = async (API_KEY, Address, type, setItems, substring, sortMethod, filterMethod) => {
    try {
        // Debugging logs
        console.log("API_KEY:", API_KEY);
        console.log("Address:", Address);
        console.log("Type:", type);
        console.log("Substring:", substring);
        console.log("Sort method:", sortMethod);
        console.log("Filter method:", filterMethod);

        const url = new URL("http://localhost:8080/getEmail");
        url.searchParams.append("Address", Address?.current || "defaultAddress");
        url.searchParams.append("type", type || "defaultType");
        url.searchParams.append("substring", substring?.current || "");
        url.searchParams.append("sort", (sortMethod?.current || "default").replace(/\s+/g, ''));
        url.searchParams.append("search", (filterMethod?.current || "default").replace(/\s+/g, ''));

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_KEY?.current}`,
            },
        });

        if (response.ok) {
            const emails = await response.json();
            console.log("Emails fetched:", emails);

            const formattedEmails = emails.map(email => ({
                id: email.id,
                fromAddress: email.fromAddress,
                toAddress: email.toAddress,
                subject: email.subject || "No Subject",
                body: email.body || "No Content",
                color: determineBorderColor(email.priority),
                type: type,
                time: email.timeStamp,
                attachments: email.attachments,
                singleAddressDraft : email.singleAddressDraft,
                toAddressDraft : email.toAddressDraft,
            }));

            setItems(formattedEmails);
        } else {
            console.error("Error fetching emails:", response.status);
            throw new Error(`Failed to fetch emails, status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const determineBorderColor = (priority) => {
    const priorityLower = priority?.toLowerCase();
    switch (priorityLower) {
        case "high":
            return "red";
        case "medium":
            return "yellow";
        case "low":
            return "green";
        default:
            return "grey"; // Default color for undefined or unexpected values
    }
};

export { fetchEmails };
