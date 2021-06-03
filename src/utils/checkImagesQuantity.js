function filesQuantityChecker(files, limit, actual) {
  const filesToAdQuantity = files.length;
  return filesToAdQuantity + actual <= limit;
}

export default filesQuantityChecker;
