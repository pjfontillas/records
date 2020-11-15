#!/usr/bin/python
def read_file(file, delimiter):
  """Reads data from a file, separated via delimiter

  Args:
    file:
      Path to file.
    delimiter:
      Data value separator, similar to using CSV.

  Returns:
    An array of dict records.
  """

  f = open(file, 'r')
  lines = f.readlines()
  records = []
  for line in lines:
    # convert to obj first
    record = line.strip().split(delimiter)
    record_obj = {
      'lastName': record[0],
      'firstName': record[1],
      'gender': record[2],
      'favoriteColor': record[3],
      'dateOfBirth': record[4]
    }
    records.append(record_obj)
    f.close()
  return records

def sort_records(data, sort):
  """ Sorts records via 3 methods: gender, birth date, and last name

  Args:
    data:
      Array of dict records to sort.
    sort:
      Sort method to use, one of ['gender', 'birthdate', 'lastname'].

  Returns:
    An array of sorted dict records.
  """
  sorted_data = None
  # sorted by gender (females before males) then by last name ascending.
  # see how it maintains ordering:
  # https://docs.python.org/3/howto/sorting.html#sort-stability-and-complex-sorts
  if sort == 'gender':
    # sort by last name first
    sorted_data = sorted(data, key=lambda x: x['lastName'], reverse=True)
    # sort again by gender within that set
    sorted_data = sorted(sorted_data, key=lambda x: x['gender'])
  if sort == 'birthdate':
    # sorted by birth date, ascending
    sorted_data = sorted(data, key=lambda x: x['dateOfBirth'], reverse=True)
  if sort == 'lastname':
    # sorted by last name, descending
    sorted_data = sorted(data, key=lambda x: x['lastName'])
  return sorted_data

def save_record(file, delimiter, data):
  """ Save a single record to a specified file

  Args:
    file:
      Path to file.
    delimiter:
      Data value separator, similar to using CSV.
    data:
      Single dict record to save.
  """
  records = read_file(file, delimiter)
  # search for existing record, if found then update
  found = False
  for record in records:
      if (record['lastName'] == data['lastName']
        and record['firstName'] == data['firstName']
        and record['gender'] == data['gender']
        and record['dateOfBirth'] == data['dateOfBirth']):
        for key in data:
          record[key] = data[key]
        found = True

  # otherwise if none found then append data as new record
  if (not found):
    records.append(data)

  # write records to file
  f = open(file, 'w')
  for record in records:
    f.write(f"{record['lastName']}{delimiter}{record['firstName']}{delimiter}{record['gender']}{delimiter}{record['favoriteColor']}{delimiter}{record['dateOfBirth']}\n")
  f.close()