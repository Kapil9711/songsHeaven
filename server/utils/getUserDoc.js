export default function getUserDoc(data) {
  const { authMethod } = data;
  let userDoc = {
    name: data.name,
    password: data.password,
    email: data.email,
    authMethod,
  };

  return userDoc;
}
