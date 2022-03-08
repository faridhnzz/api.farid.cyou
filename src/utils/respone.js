export function json(res, data) {
  res.status(200).json({
    status: true,
    data,
  });
}

export function indexJson(res, data) {
  res.status(200).json({
    status: false,
    message: `Provide a using the ${data}`,
  });
}

export function errorJson(res, error) {
  res.status(404).json({
    status: false,
    message: `Something went wrong: ${error}`,
  });
}
