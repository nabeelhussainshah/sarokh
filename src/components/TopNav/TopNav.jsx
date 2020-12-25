import React, { Fragment , useEffect , useState } from 'react';
import { Link , useHistory  } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function TopNav(props) {
	const {i18n, t} = useTranslation();
	const [lang, setlang] = useState('');
	let history = useHistory();
	 const doSomething = e => {
		 if (localStorage.getItem('Language')!="Arabic") {
			localStorage.setItem("Language","Arabic");
			i18n.changeLanguage('en');
		 }
		 else{
			localStorage.setItem("Language","English")
			i18n.changeLanguage('sa');
		 }
		 let URLarray = window.location.href.split("/")
		 let Url= "./"+URLarray[URLarray.length-1]
		 //alert(Url);
		 history.push(Url);
		}
		useEffect(async () => {
					}, [lang]);
	return (
		<nav className="main-header navbar navbar-expand navbar-white navbar-light">
			{/* Left navbar links */}
			<ul className="navbar-nav">
				<li className="nav-item">
					<a className="nav-link" data-widget="pushmenu" role="button">
						<i className="fas fa-bars" />
					</a>
				</li>
				{props.links === 'shipper' ? (
					<Fragment>
						<li className="nav-item d-none d-sm-inline-block">
							<Link to="/shipper/printwaybill" className="nav-link">
								{t('Print Way Bill')}
							</Link>
						</li>
						<li className="nav-item d-none d-sm-inline-block">
							<Link to="/shipper/newshipment/step1" className="nav-link">
								{t('New Shipment')}
							</Link>
						</li>
						<li className="nav-item d-none d-sm-inline-block">
							<Link to="/shipper/bulkshipmentupload" className="nav-link">
								{t('Bulk Shipment Upload')}
							</Link>
						</li>
						<li className="nav-item d-none d-sm-inline-block">
							<Link to="/shipper/printbulkshipment" className="nav-link">
								{t('Print Bulk Shipment')}
							</Link>
						</li>
					</Fragment>
				) : null}
			</ul>

			{/* Right navbar links */}
			<ul className="navbar-nav ml-auto">
				{
					localStorage.getItem('Language')!="Arabic"?<button className="btn btn-primary" type="button" onClick={doSomething}> العربية</button>:<button className="btn btn-primary" type="button" onClick={doSomething}>English </button>
				}
				
				<li className="nav-item dropdown">
					<a className="nav-link" data-toggle="dropdown" href="#">
						<i className="far fa-user" />
					</a>
					<div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
						<div className="dropdown-divider" />
						<a href="#" className="dropdown-item">
							<i className="far fa-user mr-2" /> Profile
						</a>
						<div className="dropdown-divider" />
						<Link to="/logout" className="dropdown-item">
							<i className="fas fa-users mr-2" /> Logout
						</Link>
					</div>
				</li>
			</ul>
		</nav>
	);
}

export default TopNav;
