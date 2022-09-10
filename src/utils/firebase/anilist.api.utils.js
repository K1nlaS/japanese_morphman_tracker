//Misc
const delay = (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

////Anilist API

export const fetchAnilistShow = async (title) => {
  //Rate limiting is currently set to 90 requests per minute by anilist. To prevent recieving a cooldown this whole function is being delayed by 0.8 seconds on each call.
  await delay(800);


  // Defines query as a multi-line string
  let query = `
    query ($search: String) { # Define which variables will be used in the query (id)
      Media (search: $search, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
        id
          title {
            romaji
            english
            native
          },
          description,
          coverImage {
            medium,
            large,
            extraLarge,
            color
          },
          bannerImage,
          siteUrl
      }
    }
  `;

  // Defines our query variables and values that will be used in the query request
  let variables = {
    search: title
  };

  // Defines the config for Api request
  let url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    };

  // Makes the HTTP Api request
  const anilistMedia = await fetch(url, options).then(handleResponse)
    .then(handleData)
    .catch(handleError);

  function handleResponse(response) {
    return response.json().then(function(json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  // Returning data if succeded, null if not.
  function handleData(data) {
    return data;
  }

  function handleError(error) {
    console.log(error.code);
    return null;
  }

  return anilistMedia;
};