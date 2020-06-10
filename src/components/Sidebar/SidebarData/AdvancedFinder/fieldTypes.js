export const fieldTypes = [
  {
    type: 'number',
    operatorsField: [
      {
        value: 'eq',
        label: 'Equal'
      },
      {
        value: 'greaterThen',
        label: 'Greater then'
      },
      {
        value: 'smaller',
        label: 'Smaller'
      }
    ],
    valueField: {
      type: 'number'
    }
  },
  {
    type: 'boolean',
    operatorsField: [
      {
        value: 'eq',
        label: 'Equal'
      }
    ],
    valueField: {
      type: 'optionSet',
      options: [
        {
          value: 'true',
          label: 'True'
        },
        {
          value: 'false',
          label: 'False'
        }
      ]
    }
  },
  {
    type: 'date',
    operatorsField: [
      {
        value: 'eq',
        label: 'Equal'
      }
    ],
    valueField: {
      type: 'optionSet',
      options: [
        {
          value: 'today',
          label: 'Today'
        },
        {
          value: 'yesterday',
          label: 'Yesterday'
        },
        {
          value: 'thisWeek',
          label: 'This week'
        }
      ]
    }
  }
];
