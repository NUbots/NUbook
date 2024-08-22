import argparse
import mmap
import os
from pathlib import Path
import re

# Add command line arguments for the root to NUbots and NUbook
parser = argparse.ArgumentParser(
    description="Add README.md files from the main codebase to NUbook"
)
parser.add_argument(
    "--main_codebase_path",
    type=str,
    help="Relative path to the main codebase folder",
    default="../NUbots/",
)
parser.add_argument(
    "--nubook_path",
    type=str,
    help="Relative path to the NUbook folder",
    default=".",
)
args = parser.parse_args()

# Constants for MDX content
READMES_PATH = "./src/book/04-readmes"
MD_CONTENT_TEMPLATE = """---
section: Readmes
chapter: {chapter}
title: {title}
description: README files for the {description} modules in the main NUbots codebase
slug: {slug}
---

"""


def process_readme_file(file):
    """Process a single README.md file and create the corresponding MDX file."""
    # Read the content of this README.md file
    with open(file, "r", encoding="utf-8") as f:
        md_content = f.read()

    # Adjust headings by adding an extra #
    md_content = re.sub(r'^(#+)', r'#\1', md_content, flags=re.MULTILINE)

    # The page slug this readme will be added to
    subfolder_name = Path(file).parts[Path(file).parts.index("module") + 1]
    slug = f"/readmes/{subfolder_name}/"

    # The header content for the MDX file
    markdown_content = MD_CONTENT_TEMPLATE.format(
        chapter="Module",
        title=subfolder_name.title(),
        description=subfolder_name,
        slug=slug,
    )

    # The path of the mdx file this readme will be added to
    mdx_file_path = os.path.join(
        READMES_PATH,
        f"{subfolder_name.removesuffix('.md')}.mdx",
    )
    print(mdx_file_path)

    with open(mdx_file_path, "a+") as secondfile:
        try:
            file_search = mmap.mmap(secondfile.fileno(), 0, access=mmap.ACCESS_READ)
            if file_search.find(b"---") == -1:
                secondfile.write(markdown_content)
        except ValueError:
            secondfile.write(markdown_content)

        secondfile.write(md_content + "\n")


def find_readmes(parent_path):
    """Recursively find and process README.md files in the given parent path."""
    results = [
        os.path.join(root, file)
        for root, _, files in os.walk(parent_path)
        for file in files
        if file == "README.md"
    ]

    if not results:
        print("No README.md files found in the main codebase.")
        return

    try:
        os.mkdir(os.path.join(READMES_PATH, args.nubook_path))
    except FileExistsError:
        pass

    for file in results:
        process_readme_file(file)

try:
    os.mkdir(READMES_PATH)
except FileExistsError:
    pass

# Find all the readmes and create NUbook pages for them
find_readmes(os.path.join(args.main_codebase_path, "module"))
