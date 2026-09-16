#!/usr/bin/env python3
import re

with open('Prototype/modules/user-list.js', 'r') as f:
    c = f.read()

# Find all script string boundaries
pattern = r', "\\n\(function'
matches = [(m.start(), m.end()) for m in re.finditer(pattern, c)]
print(f'Found {len(matches)} script boundaries (", \\n(function")')
for i, (start, end) in enumerate(matches[:10]):
    print(f'  Script {i+1} starts at position {start}')

# Also check that each script ends properly
# Look for the pattern where scripts array should close
scripts_end_marker = '],\n  "usesAnnotations"'
scripts_end_pos = c.find(scripts_end_marker)
print(f'\nscripts array ends at: {scripts_end_pos}')

# Check what's right before that
print(f'Content before scripts end: {repr(c[scripts_end_pos-50:scripts_end_pos+20])}')