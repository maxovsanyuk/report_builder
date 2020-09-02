export function getDataSetFields(entityName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (entityName) {
        case "activity_mime_attachment":
          resolve({
            items: [
              {
                logicalName: "idAttach",
                label: "idAttach",
                type: "field",
                valueType: "number",
                chosen: true,
              },
              {
                logicalName: "nameAttach",
                label: "attachmentName",
                type: "field",
                valueType: "date",
                chosen: true,
              },
              {
                logicalName: "idAttach1",
                label: "idAttach",
                type: "field",
                valueType: "number",
                chosen: true,
              },
              {
                logicalName: "nameAttach2",
                label: "attachmentName",
                type: "field",
                valueType: "boolean",
                chosen: true,
              },
              {
                logicalName: "activity_mime_attachment",
                label: "Attachments",
                type: "related",
                chosen: false,
              },
              {
                logicalName: "account",
                label: "Account",
                type: "related",
                chosen: false,
              },
            ],
          });
          break;
        case "account":
          resolve({
            items: [
              {
                logicalName: "idAcc",
                label: "idAccount",
                type: "field",
                valueType: "boolean",
                chosen: true,
              },
              {
                logicalName: "nameAcc",
                label: "accountName",
                type: "field",
                valueType: "number",
                chosen: true,
              },
              {
                logicalName: "contacts",
                label: "Contacts",
                type: "related",
                chosen: false,
              },
              {
                logicalName: "activity_mime_attachment",
                label: "Attachments",
                type: "related",
                chosen: false,
              },
            ],
          });
          break;
        case "contacts":
          resolve({
            items: [
              {
                logicalName: "idContact",
                label: "idContact",
                type: "field",
                valueType: "boolean",
                chosen: true,
              },
              {
                logicalName: "nameContact",
                label: "contactName",
                type: "field",
                valueType: "date",
                chosen: true,
              },
              {
                logicalName: "account",
                label: "Account",
                type: "related",
                chosen: false,
              },
              {
                logicalName: "activity_mime_attachment",
                label: "Attachments",
                type: "related",
                chosen: false,
              },
            ],
          });
          break;
        default:
          break;
      }
    }, 1000);
  });
}
