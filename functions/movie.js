const axios = require('axios');

exports.handler = async function (event, context) {
  console.log(event);
  const payload = JSON.parse(event.body); //문자로 가져오기 때문에 parse해준다.
  const { title, type, number, year, page, id } = payload;
  const OMDB_API_KEY = '7035c60c';
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  try {
    const { data } = await axios.get(url);
    if (data.Error) {
      return {
        statusCode: 400,
        body: data.Error,
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message,
    };
  }
};
