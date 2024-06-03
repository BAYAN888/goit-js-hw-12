import axios from 'axios';

const mainUrl = 'https://pixabay.com/api/';

export async function searchImg(yellow, flower, page) {
  const response = await axios(mainUrl, {
    params: {
      key: '44177733-63c355e78480ae17b664c6dfc',
      q: yellow,
      flower,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 15,
    },
  });
  return response.data;
}
