export function defineFilterFieldsType(type) {
  switch (type) {
    case "number":
      return {
        valueField: {
          type: "number",
        },
        operatorsField: [
          {
            value: "eq",
            label: "Equal",
          },
          {
            value: "greaterThen",
            label: "Greater then",
          },
          {
            value: "smaller",
            label: "Smaller",
          },
        ],
      };

    case "boolean":
      return {
        operatorsField: [
          {
            value: "eq",
            label: "Equal",
          },
        ],
        valueField: {
          type: "optionSet",
          options: [
            {
              value: "true",
              label: "True",
            },
            {
              value: "false",
              label: "False",
            },
          ],
        },
      };

    case "date":
      return {
        type: "date",
        operatorsField: [
          {
            value: "eq",
            label: "Equal",
          },
        ],
        valueField: {
          type: "optionSet",
          options: [
            {
              value: "today",
              label: "Today",
            },
            {
              value: "yesterday",
              label: "Yesterday",
            },
            {
              value: "thisWeek",
              label: "This week",
            },
          ],
        },
      };
    default:
      return {};
  }
}
