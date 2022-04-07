const apiUrl = 'static/Covid19JapanAll_Hyogo.json';

export const fetchCovid19 = async () => {
  const response = await fetch(apiUrl);
  const data = response.json();

  return data;
};
