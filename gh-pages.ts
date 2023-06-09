const execSync = require('child_process').execSync;

try {
  execSync('git checkout --orphan gh-pages');
  console.log('Building...');
  execSync('npm run build');
  execSync('git --work-tree build add --all');
  execSync('git --work-tree build commit -m "Deploy to GitHub Pages"');
  console.log('Deploying...');
  execSync('git push origin HEAD:gh-pages --force');
  execSync('rm -r build');
  execSync('git checkout -f main');
  execSync('git branch -D gh-pages');
  console.log('Successfully deployed to GitHub Pages.');
} catch (error) {
  console.error('Error deploying to GitHub Pages:', error);
}
