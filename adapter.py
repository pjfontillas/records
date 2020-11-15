#!/usr/bin/python
import argparse, json

from records import read_file, sort_records, save_record

# specifiy allowed arguments, to be used in py function calls
parser = argparse.ArgumentParser(description='Read file and output data.')
parser.add_argument('-f', '--file', help='Filename', required=True)
parser.add_argument('-d', '--delimiter', help='Data delimiter', required=True)
parser.add_argument('-s', '--sort', help='Optional sort', required=False)
parser.add_argument('-r', '--record', help='Person record', required=False)
args = parser.parse_args()

# record means we want to save a record to file
if args.record:
  save_record(args.file, args.delimiter, json.loads(args.record))
  print(json.dumps(args.record, indent=4))
else:
  records = read_file(args.file, args.delimiter)

  # if a sort is specified we sort, otherwise just print default ordering
  if args.sort:
    records = sort_records(records, args.sort)

  print(json.dumps(records, indent=4))