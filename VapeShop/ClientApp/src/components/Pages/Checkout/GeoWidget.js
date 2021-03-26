import React from 'react';
import useElement from './components/utilities/useElement';
import { PageSection } from './components/utilities/ThemeComponents'

const Shipping = () => {
	const geowidgetUrl = 'https://sandbox-geowidget.easypack24.net/js/sdk-for-javascript.js';
	const geowidgetCssUrl = "https://geowidget.easypack24.net/css/easypack.css";
	const easypackMapId = 'easypack-map';

	const onGeowidgetLoad = () => {
		window.easyPackAsyncInit = function () {
			window.easyPack.init({
				mapType: 'osm',
				searchType: 'osm',
			});
			var map = window.easyPack.mapWidget(easypackMapId, function (point) {
				console.log(point);
			});
		};
	}

	useElement({
		tag: 'script',
		params: { src: geowidgetUrl },
		onload: onGeowidgetLoad
	});

	useElement({
		tag: 'link',
		params: { href: geowidgetCssUrl, rel: 'stylesheet' },
	});


	return (
		<PageSection>
			<div id={easypackMapId}></div>
		</PageSection>
	);
};

export default Shipping;