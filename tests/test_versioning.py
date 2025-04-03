import unittest
import os
import shutil
from src.core.versioning import Versioning
from src.utils.config import Config

class TestVersioning(unittest.TestCase):
    def setUp(self):
        self.config = Config()
        self.versioning = Versioning(self.config)
        self.test_repo_path = os.path.expanduser("~/ColGit_Test_Repo")
        self.versioning.repo_path = self.test_repo_path

    def tearDown(self):
        # Clean up test repository
        if os.path.exists(self.test_repo_path):
            shutil.rmtree(self.test_repo_path)

    def test_init(self):
        # Test repository initialization
        self.assertTrue(os.path.exists(self.test_repo_path))

    def test_commit(self):
        # Test commit creation
        self.versioning.commit()
        commits = [d for d in os.listdir(self.test_repo_path) if d.startswith('commit_')]
        self.assertEqual(len(commits), 1)

    def test_branch(self):
        # Test branch creation (simulating input)
        def mock_input(prompt):
            return "test_branch"
        
        original_input = __builtins__.input
        __builtins__.input = mock_input
        
        try:
            self.versioning.branch()
            branches = [d for d in os.listdir(self.test_repo_path) if d.startswith('branch_')]
            self.assertEqual(len(branches), 1)
            self.assertTrue('branch_test_branch' in branches)
        finally:
            __builtins__.input = original_input

    def test_merge(self):
        # Test merge (currently just prints message)
        result = self.versioning.merge()
        self.assertIsNone(result)

    def test_connect_github(self):
        # Test GitHub connection (currently just prints message)
        result = self.versioning.connect_github()
        self.assertIsNone(result)

if __name__ == '__main__':
    unittest.main()

