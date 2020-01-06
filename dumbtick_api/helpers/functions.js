exports.formatDate = (date) => {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	hours = hours < 10 ? '0' + hours : hours;
	return (
		date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + hours + ':' + minutes + ':' + seconds
	);
};

exports.formatRupiah = (angka) => {
	var reverse = angka.toString().split('').reverse().join(''),
		ribuan = reverse.match(/\d{1,3}/g);
	ribuan = ribuan.join('.').split('').reverse().join('');
	return 'Rp.' + ribuan + ',-';
};

const formatRupiah = (angka) => {
	var reverse = angka.toString().split('').reverse().join(''),
		ribuan = reverse.match(/\d{1,3}/g);
	ribuan = ribuan.join('.').split('').reverse().join('');
	return 'Rp.' + ribuan + ',-';
};

exports.events = (data) => {
	const Event = data.map((item) => {
		let items = {
			id: item.id,
			title: item.title,
			category: {
				id: item.category.id,
				name: item.category.name
			},
			createdBy: {
				id: item.user.id,
				name: item.user.name
			}
		};
		return items;
	});
	return Event;
};

exports.newPayments = (data) => {
	const newPayment = data.map((item) => {
		let newItem = {
			id: item.id,
			event: {
				id: item.event.id,
				title: item.event.title,
				startTime: item.event.startTime,
				endTime: item.event.endTime,
				price: item.event.price,
				description: item.event.description,
				address: item.event.address,
				urlMap: item.event.urlMap,
				image: item.event.image
			},
			buyer: {
				id: item.buyer.id,
				name: item.buyer.name
			},
			quantity: item.quantity,
			totalPrice: item.totalPrice,
			status: item.status,
			attachment: item.attachment
		};
		return newItem;
	});
	return newPayment;
};

exports.newFavorites = (data) => {
	const newFavorite = data.map((item) => {
		let newItems = {
			id: item.event.id,
			title: item.event.title,
			category: {
				id: item.event.category.id,
				name: item.event.category.name
			},
			startTime: formatDate(item.event.startTime),
			endTime: formatDate(item.event.endTime),
			price: formatRupiah(item.event.price),
			description: item.event.description,
			address: item.event.address,
			urlMap: item.event.urlMap,
			image: item.event.image,
			createdBy: {
				id: item.event.user.id,
				name: item.event.user.name,
				email: item.event.user.email,
				phone: item.event.user.phone,
				image: item.event.user.image
			}
		};
		return newItems;
	});
	return newFavorite;
};
