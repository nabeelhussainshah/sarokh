import React, { useEffect, Fragment } from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddArea(props) {
	const hist = useHistory();

	return (
		<Fragment>
			<div className="add-address-container">
				<div className="form-row margintop30">

					<div class="col-md-6">
						<label>Add Area</label>
						<input name="username" type="text" class="form-control" formcontrolname="username" placeholder="Add Area" autocomplete="username" required="" />
						<button
							type="submit"
							className="btn btn-danger btnbrown px-4 mt-3 float-right"
						>
							Search
								</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
