import React, { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function TreeMapChart() {
	useLayoutEffect(() => {
		let x = am4core.create("chartdiv", am4charts.TreeMap);

		x.data = [
			{
				name: "First",
				children: [
					{ name: "A1", value: 100 },
					{ name: "A2", value: 60 },
					{ name: "A3", value: 30 },
				],
			},
			{
				name: "Second",
				children: [
					{ name: "B1", value: 135 },
					{ name: "B2", value: 98 },
					{ name: "B3", value: 56 },
				],
			},
			{
				name: "Third",
				children: [
					{ name: "C1", value: 335 },
					{ name: "C2", value: 148 },
					{ name: "C3", value: 126 },
					{ name: "C4", value: 26 },
				],
			},
			{
				name: "Fourth",
				children: [
					{ name: "D1", value: 415 },
					{ name: "D2", value: 148 },
					{ name: "D3", value: 89 },
					{ name: "D4", value: 64 },
					{ name: "D5", value: 16 },
				],
			},
			{
				name: "Fifth",
				children: [
					{ name: "E1", value: 687 },
					{ name: "E2", value: 148 },
				],
			},
		];

		x.dataFields.value = "value";
		x.dataFields.name = "name";
		x.dataFields.children = "children";
	});

	return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}