const auth = require('../middleware/auth');

describe('auth',function() {
    it('should exists', function() {
        expect(auth).toBeDefined();
    });
    it('should be a function', function(){
        expect(typeof auth).toBe('function');
    });
});