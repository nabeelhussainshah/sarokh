import React, { useState, useEffect } from "react";
import { StatsCard } from "./components/StatsCard";
import { UserBio } from "./components/UserBio";
import MainContainer from "../../components/Containers/MainContainer";
import axios from "axios";
import { useTransition, animated } from "react-spring";

function ShipperDashboard(props) {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState(JSON.parse(localStorage.getItem("user")));
  const [response, setresponse] = useState();
  console.log(response);

  useEffect(() => {
    async function fetchAPI() {
      await axios
        .get(`${process.env.REACT_APP_API}/web-dashboard/shipper/${data.id}`)
        .then((response) => {
          if (response.data.status === 200) {
            setresponse(response.data.data);
            setloading(false);
          }
        })
        .catch((err) => {
          window.alert(err.message);
        });
    }
    fetchAPI();
  }, []);

  const transitions = useTransition(!loading, null, {
    from: { opacity: 0, transform: "translate3d(-270px,0,0)" },
    enter: {
      opacity: 1,
      transform: "translate3d(0,0px,0)",
      transition: "ease-out 0.3s",
    }
  });

  return loading ? (
    <div>Loading...</div>
  ) : (
    transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <MainContainer>
            <UserBio data={data} />
            <StatsCard response={response} />
          </MainContainer>
        </animated.div>
    ))
  );
}

export default React.memo(ShipperDashboard);
