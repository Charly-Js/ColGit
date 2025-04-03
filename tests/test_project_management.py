import unittest
from src.core.project_management import ProjectManagement

class TestProjectManagement(unittest.TestCase):
    def setUp(self):
        self.project_management = ProjectManagement()

    def test_add_task(self):
        # Test add task functionality
        initial_task_count = len(self.project_management.tasks)
        self.project_management.add_task()
        self.assertEqual(len(self.project_management.tasks), initial_task_count + 1)

    def test_view_tasks(self):
        # Test view tasks functionality
        pass

if __name__ == '__main__':
    unittest.main()

