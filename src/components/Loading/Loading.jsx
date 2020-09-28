import React from 'react';

export default function Loading(porps) {
	return (
		<div
			style={{ display: 'flex', justifyContent: 'center', marginTop: '25%' }}
		>
			<div
				class="spinner-border"
				style={{ width: '4rem', height: '4rem' }}
			></div>
		</div>
	);
}
