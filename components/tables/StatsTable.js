import { StyleSheet, Text, View } from "react-native";
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

function StatsTable({ data }) {
	const averageTimeDivision = divisionEuclidienne(data.average.raceTime, 60);
	const averageTimeMinutes = averageTimeDivision.minutes;
	const averageTimeSeconds = averageTimeDivision.seconds;
	const bestTimeDivision = divisionEuclidienne(data.best.raceTime, 60);
	const bestTimeMinutes = bestTimeDivision.minutes;
	const bestTimeSeconds = bestTimeDivision.seconds;
	return (
		<View style={styles.tableContainer}>{ /* Table container */}
			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.voidCell]}>{ /* One cell within the row */}
					<Text style={styles.cellText}></Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Moyenne</Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Record</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Vitesse moyenne</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.average.averageSpeed} m/h</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.best.averageSpeed} m/h</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Vitesse maximale</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.average.highestSpeed} m/h</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.best.highestSpeed} m/h</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Durée de la course</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{averageTimeMinutes}min {averageTimeSeconds} s</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{bestTimeMinutes}min {bestTimeSeconds} s</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Nombre de chocs</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.average.hitCount} </Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.best.hitCount} </Text>
				</View>
			</View>
		</View>
	);
}

export default StatsTable;

const styles = StyleSheet.create({
	tableContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	row: { 
		flexDirection: 'row' 
	},
	cell: { 
		padding: Sizes.XS,
		width: '33.3%',
	},
	voidCell: { 
		opacity: 0,
	},
	titleCell: { 
		opacity: 1,
		backgroundColor: Colors.primary800,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: Colors.primary800,
	},
	valueCell: { 
		opacity: 1,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: Colors.primary800,
	},
	cellText: {
		color: "white",
	}
});