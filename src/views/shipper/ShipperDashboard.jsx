import React, { useState, useEffect } from "react";
import { StatsCard } from "./components/StatsCard";
import { UserBio } from "./components/UserBio";
import MainContainer from "../../components/Containers/MainContainer";
import axios from "axios";
import { useTransition, animated } from "react-spring";

function ShipperDashboard(props) {

  const user = JSON.parse(localStorage.getItem('user'));
  const [response, setresponse] = useState({loading: true});
  console.log(response);


  useEffect(() => {
    async function fetchAPI() {
      return await axios
        .get(`${process.env.REACT_APP_API}/web-dashboard/shipper/${user.id}`)
        .then((response) => {
          if (response.data.status === 200) {
            setresponse({loading: false, data: response.data.data});
          }
        })
        .catch((err) => {
          window.alert(err.message);
        });
    }
    fetchAPI();

    return ()=> window.location.reload();

  }, []);

  const transitions = useTransition(!response.loading, null, {
    from: { opacity: 0, transform: "translate3d(-290px,0,0)" },
    enter: {
      opacity: 1,
      transform: "translate3d(0,0px,0)",
      transition: "ease-out 0.3s",
    },
  });

  return response.loading ? (
    <div>Loading...</div>
  ) : (
    transitions.map(
      ({ item, props, key }) =>
        item && (
          <animated.div key={key} style={props}>
            <MainContainer>
              <UserBio data={user} />
              <StatsCard response={response.data} />
            </MainContainer>
          </animated.div>
        )
    )
  );
}

export default React.memo(ShipperDashboard);
