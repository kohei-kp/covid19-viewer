const apiUrl = 'static/Covid19JapanAll.json';

export const fetchCovid19 = async () => {
  const response = await fetch(apiUrl);
  const data = response.json();

  return data;
};
