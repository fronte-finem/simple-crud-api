/**
 * @type { Controller }
 */
export const personController = (path, req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    })
  );
};
