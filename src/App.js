import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Teambox from './Components/Teambox';
import TeamDetails from './Components/TeamDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  const [teams, setTeams] = useState([])
  const [countries, setcountries] = useState([])
  const [sports, setsports] = useState([])
  const [leagues, setleagues] = useState([])
  const [league, setleague] = useState("")
  const [country, setcountry] = useState("Spain")
  const [sport, setsport] = useState("Soccer")
  useEffect(() => {
    fetch('https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4460')
      .then(res => res.json()).then(teamsdata => { setTeams(teamsdata.teams); })
    return () => {

    }
  }, [])
  useEffect(() => {

    fetch('https://www.thesportsdb.com/api/v1/json/1/all_countries.php')
      .then(res => res.json()).then(countrydata => { setcountries(countrydata.countries); })

    return () => {

    }
  }, [])
  useEffect(() => {

    fetch(' https://www.thesportsdb.com/api/v1/json/1/all_sports.php')
      .then(res => res.json()).then(sportsdata => { setsports(sportsdata.sports); })
    return () => {

    }
  }, [])

  useEffect(() => {
    fetch(`https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=${country}&s=${sport}`)
      .then(res => res.json()).then(leaguedata => { setleagues(leaguedata.countrys); })
    return () => {

    }
  }, [country, sport])

  useEffect(() => {
    console.log(league)
    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=${league}`)
      .then(res => res.json()).then(teamsdata => { setTeams(teams => teamsdata.teams) })

    return () => {

    }
  }, [league])


  return (
    <div className="App">
      <Router>
        <Switch>

          <Route path="/team/:teamID">
            <TeamDetails></TeamDetails>
          </Route>
          <Route path="*">
            <Header type="text" data={{ title: "Team Lookup" }}></Header>
            <div className="selection">
              <select name="country" id="" placeholder="select country" onChange={(e) => { setcountry(encodeURIComponent(e.target.value)) }}>
                <option >Select Country</option>
                {countries?.map(country => <option value={encodeURIComponent(country.name_en)} key={encodeURIComponent(country.name_en)}>{country.name_en}</option>)}
              </select>
              <select name="sport" id="" placeholder="select sport" onChange={(e) => { setsport(encodeURIComponent(e.target.value)) }}>
                <option >Select Sport</option>
                {sports?.map(sport => <option value={sport.strSport} key={sport.strSport}>{sport.strSport}</option>)}
              </select>
              <select name="leage" id="" placeholder="select league" onChange={(e) => { setleague(e.target.value); }}>
                <option >Select League</option>
                {leagues?.map(league => <option value={league.idLeague} key={league.idLeague} >{league.strLeague}</option>)}

              </select>
            </div>
            <div className="teams">
              {teams.length > 1 ? Array.from(teams).map(team => { return <Teambox teaminfo={team} key={team.idTeam}></Teambox> }) : <h2 className="errormsg">No teams found</h2>}

            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
