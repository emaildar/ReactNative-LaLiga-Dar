import React, {Component} from 'react'
import axios from 'axios';
import { ScrollView } from 'react-native';
import { Container, Left, Body, Text, ListItem, List, Spinner, Thumbnail } from 'native-base';

class ListTeams extends Component {

    state = {
        listTeams: "",
        loadData: false
    }

    static navigationOptions = {
        title: "La Liga Teams",
        headerStyle: {
            backgroundColor: "purple"
        },
        headerTintColor: "white"
    }

    componentDidMount() {
        this.setState({
            loadData: true
        })
        axios.get('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?s=Soccer&c=Spain').then((x) => {
            this.setState({
                listTeams: x.data.teams,
                loadData: false
            })
        })
    }

    displayTeams() {
        return this.state.listTeams.map((val, i) => {
            var idTeam = val.idTeam;
            var teamName = val.strTeam;
            var teamWebsite = val.strWebsite;
            var teamLogo = val.strTeamBadge

            return (
                <ListItem key={i} avatar onPress={() => {
                    this.props.navigation.navigate("ListPlayers", {
                        idTeam: idTeam,
                        teamName: teamName
                    })
                }}>
                    <Left>
                        <Thumbnail source={{ uri: teamLogo }} />
                    </Left>
                    <Body>
                        <Text>{teamName}</Text>
                        <Text note>{teamWebsite}</Text>
                    </Body>
                </ListItem>
            )
        })
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <List>
                        {this.state.loadData ? <Spinner color='blue' /> : this.state.listTeams ? this.displayTeams() : <Text></Text>}
                    </List>
                </ScrollView>
            </Container>
        )
    }
}

export default ListTeams;