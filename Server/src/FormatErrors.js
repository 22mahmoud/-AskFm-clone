export default (error) => {
  const errors = [];
  if (!error.errors) {
    return [{ path: 'user', message: 'Unauthorized' }];
  }
  const pathName = Object.keys(error.errors);

  for (let i = 0; i < pathName.length; i += 1) {
    const newPathName = pathName[i];
    const { path, message } = error.errors[newPathName].properties;
    errors.push({ path, message });
  }
  return errors;
};
