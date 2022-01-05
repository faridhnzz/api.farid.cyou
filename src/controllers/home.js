module.exports = async (req, res) => {
  res.set('cache-control', `public, max-age=300, immutable`);

  const fullUrl = `${req.protocol}://` + req.headers.host + req.originalUrl;
  return res.json({
    status: true,
    maintainer: 'Farid Nizam <me@farid.cyou>',
    disclaimer: 'All requests can be changed at any time.',
    data: {
      github_profile: {
        Endpoint: '/api/github?username={username}',
        Example: `${fullUrl}api/github?username=faridnizam`,
      },
      instagram_profile: {
        Auth: '[?sessionid={sessionid}] for authentication to allow you to access your private profile as long as you follow it.',
        Endpoint: '/api/instagram?sessionid={optional}&username={username}',
        Example: `${fullUrl}api/instagram?username=faridhnzz`,
      },
      urban_dictionary: {
        Endpoint: '/api/urban?search={text}',
        Example: `${fullUrl}api/urban?text=ok`,
      },
      wikipedia: {
        language: 'Default language EN, you can use id, en, nl, etc.',
        Endpoint: '/api/wikipedia?lang={language}&search={search}',
        Example: `${fullUrl}api/wikipedia?lang=id&search=dahyun`,
      },
      translate: {
        language: 'Default language EN, you can see country code here (https://s.id/language-support)',
        Endpoint: '/api/translate?text={text}&to={language}',
        Example: `${fullUrl}api/translate?text=selamat%20datang&to=en`,
      },
      bmkg_data: {
        quake: {
          Endpoint: '/api/bmkg-gempa',
          Example: `${fullUrl}api/bmkg-gempa`,
        },
        weather: {
          status: 'SOON',
          Endpoint: '/api/bmkg-weather',
          Example: `${fullUrl}api/bmkg-weather`,
        },
      },
    },
  });
};
