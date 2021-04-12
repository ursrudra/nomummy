export const groupBy = (list, key) => {
  if (!list) return false;
  let group = list.reduce((r, a) => {
    r[a[key]] = [...(r[a[key]] || []), a];
    return r;
  }, {});
  return group;
};

export const generateRandomNumber = (number = 10) => {
  return Math.floor((Math.random() * number) + 1);
}

export const getSoftFunction = (sortby) => {
  switch (sortby) {
    case "name":
      return (a, b) => (a[sortby] > b[sortby] ? 1 : -1);
    case "price":
      return (a, b) => Number(a.price) - Number(b.price);
    case "qty":
      return (a, b) => Number(a.items_available) - Number(b.items_available);
    case "discount":
      return (a, b) => Number(a.discount) - Number(b.discount);
    case "name_reverse":
      return (a, b) => (a.short_name < b.short_name ? 1 : -1);
    case "price_reverse":
      return (a, b) => Number(b.price) - Number(a.price);
    case "qty_reverse":
      return (a, b) => Number(b.items_available) - Number(a.items_available);
    case "discount_reverse":
      return (a, b) => Number(b.discount) - Number(a.discount);

    default:
      return (a, b) => (a.short_name > b.short_name ? 1 : -1);
  }
};

export const parseAuthUser = (user) => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
  phoneNumber: user.phoneNumber
})