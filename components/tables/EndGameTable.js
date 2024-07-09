import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Sizes } from "../../constants/styles";

function divisionEuclidienne(divided, divider)
{
	var quotient = 0;
	var rest;
	while (divided >= divider)
	{
		quotient += 1;
		divided -= divider;
	}
	rest = divided;
	return {minutes: quotient, seconds: rest};
}

function EndGameTable({ raceData, bestData }) {
	const raceTimeDivision = divisionEuclidienne(raceData.raceTime, 60);
	const raceTimeMinutes = raceTimeDivision.minutes;
	const raceTimeSeconds = raceTimeDivision.seconds;
	const bestTimeDivision = divisionEuclidienne(bestData.raceTime, 60);
	const bestTimeMinutes = bestTimeDivision.minutes;
	const bestTimeSeconds = bestTimeDivision.seconds;
	return (
		<View style={styles.tableContainer}>{ /* Table container */}
			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.voidCell]}>{ /* One cell within the row */}
					<Text></Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text>Cette course</Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text>Record</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={{color: "white"}}>Vitesse moyenne</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text>{raceData.averageSpeed} m/h</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text>{bestData.averageSpeed} m/h</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={[styles.cell, styles.titleCell]}>
					<Text>Vitesse maximale</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text>{raceData.highestSpeed} m/h</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text>{bestData.highestSpeed} m/h</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={[styles.cell, styles.titleCell]}>
					<Text>Durée de la course</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text>{raceTimeMinutes}min {raceTimeSeconds} s</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text>{bestTimeMinutes}min {bestTimeSeconds} s</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={[styles.cell, styles.titleCell]}>
					<Text>Nombre de chocs</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text>{raceData.hitCount} </Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text>{bestData.hitCount} </Text>
				</View>
			</View>
		</View>
	);
}

export default EndGameTable;

const styles = StyleSheet.create({
	tableContainer: {
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center'
	},
	row: { 
		flex: 1, 
		alignSelf: 'stretch', 
		flexDirection: 'row' 
	},
	cell: { 
		flex: 1, 
		alignSelf: 'stretch', 
	},
	voidCell: { 
		opacity: 0,
	},
	titleCell: { 
		opacity: 1,
		backgroundColor: Colors.primary800,
	},
	valueCell: { 
		opacity: 1,
		border: '1px solid',
		borderColor: Colors.primary800,
	},
});