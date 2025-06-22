export const currencyFormat = (num) => {
	return 'R$ ' + num.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const formatDate = (date) => {
	var options = { year: 'numeric', month: 'long', day: 'numeric', timezone: 'UTC' };
	return new Date(date.replace(/-/g, '\/')).toLocaleDateString('pt-BR', options);
}

export const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
  }