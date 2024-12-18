// emailServices.js
const fetchEmails = async (API_KEY, Address, type, setItems, substring, sortMethod, filterMethod) => {
    try {
      console.log(substring.current);
      console.log(filterMethod.current);
      const url = new URL("http://localhost:8080/getEmail");
      url.searchParams.append("Address", Address.current);
      url.searchParams.append("type", type);
      url.searchParams.append("substring", substring?.current || "");
      url.searchParams.append("sort", sortMethod?.current.replace(/\s+/g, '') || "default");
      url.searchParams.append("search", filterMethod?.current.replace(/\s+/g, '') || "default");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY.current}`,
        },
      });
  
      if (response.ok) {
        const emails = await response.json();
        console.log("Emails fetched:", emails);
  
        const formattedEmails = emails.map((email) => {
          let borderColor;
          console.log(email.priority?.toLowerCase());
          switch (email.priority?.toLowerCase()) {
            case "high":
              borderColor = "red";
              break;
            case "medium":
              borderColor = "yellow";
              break;
            case "low":
              borderColor = "green";
              break;
            default:
              borderColor = email.priority?.toLowerCase();
          }
  
          return {
            id: email.id,
            fromAddress: email.fromAddress,
            toAddress: email.toAddress,
            subject: email.subject || "No Subject",
            body: email.body || "No Content",
            color: borderColor,
            type: type,
            time: email.timeStamp,
            attachments: email.attachments,
          };
        });
  
        setItems(formattedEmails);
      } else {
        console.error("Error fetching emails:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  
  export { fetchEmails };
  