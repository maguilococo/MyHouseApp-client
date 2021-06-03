const fileSizeChecker = (files) => {
  const filesToInspects = [...files];
  const bigFiles = filesToInspects.filter((file) => file.size > 2097152);
  return bigFiles.length > 0;
};

export default fileSizeChecker;
