import get from "lodash/get";

export function findChangedFilter(i, fId, id, changedItems) {
  get(i, "items") &&
    i.items.map((f) => {
      return f.filterId === fId
        ? {
            ...i,
            items: i.items.map((r) => {
              return r.filterId === id ? { ...r, ...changedItems } : r;
            }),
          }
        : findChangedFilter(f, fId, id, changedItems);
    });
}
