const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const userOrOrg = 'takenet';
    const maxRepos = 5;
    const response = await axios.get(`https://api.github.com/users/${userOrOrg}/repos`, {
      params: {
        per_page: 100,
        sort: 'created',
        direction: 'asc'
      }
    });

    const repos = response.data;

    const csharpRepos = repos.filter(repo => repo.language === 'C#');

    const oldestCSharpRepos = csharpRepos.slice(0, maxRepos);

    // Criar um array com os dados desejados
    const repoData = oldestCSharpRepos.map(repo => ({
      repository: repo.full_name,
      description: repo.description
    }));
    return {
      statusCode: 200,
      body: JSON.stringify(repoData, null, 2),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data' }),
    };
  }
};
