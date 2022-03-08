export default async function (req, res) {
  return res.json({
    status: true,
    maintainer: 'Farid Nizam <me@farid.cyou>',
    github: 'https://github.com/faridnizam',
    disclaimer: {
      id: 'Semua permintaan dapat diubah kapan saja.',
      en: 'All requests can be changed at any time.',
    },
    data: 'Soon.',
  });
}
