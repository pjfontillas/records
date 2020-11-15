#!/usr/bin/python
import unittest

from records import read_file, sort_records, save_record

# test data read, hardcoded first record value
class test_read(unittest.TestCase):
  def test(self):
    records = read_file('data/comma.txt', ',')
    self.assertEqual(records[0]['lastName'], 'Myer')

# test sorted data, values as of 11/14/2020
class test_sort(unittest.TestCase):
  def test(self):
    records = read_file('data/comma.txt', ',')

    sorted_by_gender = sort_records(records, 'gender')
    self.assertEqual(sorted_by_gender[0]['lastName'], 'Wagstaff')

    sorted_by_birthdate = sort_records(records, 'birthdate')
    self.assertEqual(sorted_by_birthdate[0]['lastName'], 'Nelson')

    sorted_by_lastname = sort_records(records, 'lastname')
    self.assertEqual(sorted_by_lastname[0]['lastName'], 'Blackwell')

# test updating data, Red color set here while set to Blue in JS API test
class test_save(unittest.TestCase):
  def test(self):
    updated_record = {
      'lastName': 'Fontillas',
      'firstName': 'Patrick',
      'gender': 'M',
      'favoriteColor': 'Red',
      'dateOfBirth': '05/06/1989',
    }
    save_record('data/comma.txt', ',', updated_record)

    # get updated records
    records = read_file('data/comma.txt', ',')

    for record in records:
        if (record['lastName'] == updated_record['lastName']
          and record['firstName'] == updated_record['firstName']
          and record['gender'] == updated_record['gender']
          and record['dateOfBirth'] == updated_record['dateOfBirth']):
          self.assertEqual(record['favoriteColor'], updated_record['favoriteColor'])

if __name__ == '__main__':
  unittest.main()