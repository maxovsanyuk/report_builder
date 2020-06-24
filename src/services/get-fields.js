const odataPrefix = '@odata';

export function getFieldsAsync(entityName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (entityName) {
        case 'activitymimeattachment':
          resolve({
            items: [
              {
                value: 'idAttach',
                label:"idAttach",
                type: 'field',
                valueType: 'number',
                chosen: true
              },
              {
                value: 'nameAttach',
                label:"attachmentName",
                type: 'field',
                valueType: 'date',
                chosen: true
              },
              {
                value: 'idAttach1',
                label:"idAttach",
                type: 'field',
                valueType: 'number',
                chosen: true

              },
              {
                value: 'nameAttach2',
                label:"attachmentName",
                type: 'field',
                valueType: 'boolean',
                chosen: true
              },
              {
                value: 'activitymimeattachment',
                label:"Attachments",
                type: 'related'
              },
              {
                value: 'account',
                label:"Account",
                type: 'related'
              }
            ],
            totalRecord: 2
          });
          break;
        case 'account':
          resolve({
            items: [
              {
                value: 'idAcc',
                label:"idAccount",
                type: 'field',
                valueType: 'boolean',
                chosen: true
              },
              {
                value: 'nameAcc',
                label:"accountName",
                type: 'field',
                valueType: 'number',
                chosen: true
              },
              {
                value: 'contacts',
                label:"Contacts",
                type: 'related'
              },
              {
                value: 'activitymimeattachment',
                label:"Attachments",
                type: 'related'
              }
            ],
            totalRecord: 2
          });
          break;
        case 'contacts':
          resolve({
            items: [
              {
                value: 'idContact',
                label:"idContact",
                type: 'field',
                valueType: 'boolean',
                chosen: true
              },
              {
                value: 'nameContact',
                label:"contactName",
                type: 'field',
                valueType: 'date',
                chosen: true
              },
              {
                value: 'account',
                label:"Account",
                type: 'related'
              },
              {
                value: 'activitymimeattachment',
                label:"Attachments",
                type: 'related'
              }
            ],
            totalRecord: 2
          });
          break;
        default:
          break;
      }

    }, 1000);
  });
}
