import { v4 as uuidv4 } from 'uuid';

export default function requestID() {
  return function (req, res, next) {
    const headerName = 'X-Request-Id';

    const oldValue = req.get(headerName);
    const id = oldValue === undefined ? uuidv4() : oldValue;
    res.set(headerName, id);

    next();
  };
}
