const odataPrefix = "@odata";

export function getEntitiesAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        items: [
          {
            name: "Account",
            logicalName: "account",
            label: "Organizations",
          },
          {
            name: "ActivityMimeAttachment",
            logicalName: "activitymimeattachment",
            label: "Attachments",
          },
        ],
        totalRecord: 2,
      });
    }, 1000);
  });
}
