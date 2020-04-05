import sys
import csv
import json

data = {}

kwargs = {'newline': ''}
mode = 'r'

disengagement_histogram = {}
if sys.version_info < (3, 0):
    kwargs.pop('newline', None)
    mode = 'rb'

months = {1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec'}

inverse_month = {}
for k,v in months.items():
	inverse_month[v] = k

def get_month(row):
	if '.' in row[2]:
		month = row[2].split('.')[0]
		#print(month)
		month = int(month)
	elif 'CRUISE' in row[0]:
		month = row[2].split('/')[1]
		month = inverse_month[month]
	elif('/' in row[2]): 
		month = row[2].split('/')[0]
		month = int(month)
	elif 'Lyft' in row[0]:
		month = row[2].split('-')[1]
		month = int(month)
	elif('Toyota' in row[0]): 
		month = row[2].split('-')[1]
		month = int(month)
	elif('-' in row[2]): 
		month = row[2].split('-')[0]
		month = int(month)
	elif 'Aurora' in row[0]:
		month = row[2][4:6]
		month = int(month)
	elif 'AutoX' in row[0]:
		month = row[2][:3]
		month = inverse_month[month]
	elif 'Phantom' in row[0]:
		month = row[2][:3]
		month = inverse_month[month]

	month = int(month)-1
	return month

def process_disengagements(filename):
	fp = open(filename, mode, **kwargs) 
	reader = csv.reader(fp, delimiter=',', quotechar='"')
	next(reader, None)  # skip the headers
	data_read = [row for row in reader]
	print(len(data_read))

	for row in data_read:
		if(row[0] == ''):
			continue
		month = get_month(row)
		print(row)
		data[row[0]]["disengagements_month"][month] += 1

		if row[7] not in data[row[0]]["disengagements_location"]:
			data[row[0]]["disengagements_location"][row[7]] = {}
			data[row[0]]["disengagements_location"][row[7]]['location'] = row[7]
			data[row[0]]["disengagements_location"][row[7]]['numbers_by_month'] = [0,0,0,0,0,0,0,0,0,0,0,0]
		data[row[0]]["disengagements_location"][row[7]]['numbers_by_month'][month] += 1

		if row[6] not in data[row[0]]["disengagements_actor"]:
			data[row[0]]["disengagements_actor"][row[6]] = {}
			data[row[0]]["disengagements_actor"][row[6]]['actor'] = row[6]
			data[row[0]]["disengagements_actor"][row[6]]['numbers_by_month'] = [0,0,0,0,0,0,0,0,0,0,0,0]
		data[row[0]]["disengagements_actor"][row[6]]['numbers_by_month'][month] += 1

		if row[8] not in data[row[0]]["disengagements_reason"]:
			data[row[0]]["disengagements_reason"][row[8]] = {}
			data[row[0]]["disengagements_reason"][row[8]]['reason'] = row[8]
			data[row[0]]["disengagements_reason"][row[8]]['numbers_by_month'] = [0,0,0,0,0,0,0,0,0,0,0,0]
		data[row[0]]["disengagements_reason"][row[8]]['numbers_by_month'][month] += 1


		

def process_miles(filename):
	fp = open(filename, mode, **kwargs) 
	reader = csv.reader(fp, delimiter=',', quotechar='"')
	next(reader, None)  # skip the headers
	data_read = [row for row in reader]

	for row in data_read:
		if(row[0] == ''):
			continue
		if(row[0] not in data):
			data[row[0]] = {}
			data[row[0]]["company_name"] = row[0]
			data[row[0]]["miles"] = 0.0
			data[row[0]]["miles_month"] = [0,0,0,0,0,0,0,0,0,0,0,0]
			data[row[0]]["diengagements"] = 0
			data[row[0]]["disengagements_month"] = [0,0,0,0,0,0,0,0,0,0,0,0]
			data[row[0]]["fleet"] = 0
			data[row[0]]["fleet_month"] = [0,0,0,0,0,0,0,0,0,0,0,0]
			data[row[0]]["disengagements_reason"] = {}
			data[row[0]]["disengagements_actor"] = {}
			data[row[0]]["disengagements_location"] = {}
		data[row[0]]["miles"] += float(row[16])
		data[row[0]]["diengagements"] += int(row[3])
		

		all_zero = True
		for i in range(12):
			if(float(row[4+i])) > 0:
				all_zero = False
				data[row[0]]["fleet_month"][i] += 1
			data[row[0]]["miles_month"][i] += float(row[4+i])


		if(not all_zero):
			data[row[0]]["fleet"] += 1


process_miles('2019AutonomousMileageReports.csv')
process_miles('2018-19_Autonomous_Mileage_Reports(firsttimefilers).csv')

process_disengagements('2019AutonomousVehicleDisengagementReports.csv')
process_disengagements('2018-19_AutonomousVehicleDisengagementReports(firsttimefilers).csv')

data_array = []
for k, v in data.items():
	for k1,v1 in v.items():
		if type(v1) == dict:
			array = []
			if type(v1) == dict:
				for k2,v2 in v1.items():
					array.append(v2)
			v[k1] = array
		else:
			v[k1] = v1
	data_array.append(v)


with open('data_for_bad_chinni_whose_name_is_vivek.json', 'w') as fp:
	json.dump(data_array, fp)


