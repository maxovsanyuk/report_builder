export function getDataSetEntities() {
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
            name: "Activity_Mime_Attachment",
            logicalName: "activity_mime_attachment",
            label: "Attachments",
          },
        ],
      });
    }, 500);
  });
}
